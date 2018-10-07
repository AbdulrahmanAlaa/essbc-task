import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { pages } from './../../config/pages-config';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'es-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  /** defines if we are in edit mode or add mode */
  public isEditMode = false;

  /** show spinner while loading data */
  public showSpinner = false;

  /** holds current user data */
  public user: User = null;

  /** holds current date as initial value for user birthday*/
  public initialDate = new Date();

  /** holds the form that contains user data */
  public addUserForm: FormGroup;

  /** holds the subscription info in order to be deleted to clear the memory */
  private sub: Subscription = null;

  public customerImageURL: string = null;

  public submitted = false;

  public imageError = '';

  @ViewChild('customerimage')
  customerimage: ElementRef<HTMLInputElement>;

  /*************  Life Cycle Hooks  ***********/
  /**
 * parameters passed by angular Dependency Injection
 * @param usersService  contains the CRUD operation to handle users data
 * @param route  contains current active route data and parameters
 * @param router  Helps and navigating between routes
 * @param formBuilder  Helps and creating and validating Forms using reactive way
 */
  constructor(
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    // Find the Cusomer ID from URL segment
    this.route.params.subscribe((params) => {
      // Get Single user Data
      const id = +params['id'];
      if (id) {
        // Edit user Case
        this.showSpinner = true;

        // Get user Information from backend
        this.sub = this.usersService
          .getByUserID(params['id'])
          .subscribe(customer => {
            if (customer) {
              this.isEditMode = true;
              this.user = customer;
              this.showSpinner = false;
            }
            // Create Form object with required validation rules
            this.addUserForm = this.formBuilder.group({
              fname: [this.isEditMode ? this.user.name : '', Validators.required],
              lname: [this.isEditMode ? this.user.name : '', Validators.required],
              // birthday: [this.isEditMode ? new Date(this.user.created_at) : new Date()],
              // gender: this.user.gender
            });

            // Set user Image
            // this.user.customerImage = this.user.customerImage || { name: '', value: '' };
            // this.customerImageURL = this.user.customerImage.value ?
            //   this.user.customerImage.value : this.addUserForm.controls.gender.value === 'm' ?
            //     'assets/images/male.png' : 'assets/images/female.png';

          }, error => this.router.navigate([pages.userManagement.path]));
      } else {
        // Adding user Scenario
        this.addUserForm = this.formBuilder.group({
          fname: [this.isEditMode ? this.user.name : '', Validators.required],
          lname: [this.isEditMode ? this.user.name : '', Validators.required],
          // birthday: [this.isEditMode ? new Date(this.user.birthday) : new Date()],
          // gender: 'm'
        });
        // Set Default Image
        this.customerImageURL = this.addUserForm.controls.gender.value === 'm' ?
          'assets/images/male.png' : 'assets/images/female.png';
      }

    }, () => {
      this.showSpinner = false;
    });
  }


  // -------------------------------
  //     Public Functions
  // -------------------------------

  /**
   * Update form Gender with selected one
   * @param value w | m represents the Gender Male/Female
   */
  public setGender(value: string) {
    this.addUserForm.controls.gender.setValue(value);
    if (this.customerImageURL && this.customerImageURL.match(/male.png|female.png/)) {
      this.customerImageURL = this.addUserForm.controls.gender.value === 'm' ? 'assets/images/male.png' : 'assets/images/female.png';
    }
  }

  /**
   * Display the user image after selecting new one and validating the image
   * @param event Event of file changed that holds the file input info
   */
  public customerImageChanged(event: Event) {

    const input = event.target as HTMLInputElement || event.srcElement as HTMLInputElement;
    if (input.files && input.files[0] && FileReader) {

      // Validate image
      const extension = input.value.substring(input.value.lastIndexOf('.') + 1).toLowerCase();
      if (this.isValidExtension(extension)) {

        const size = input.files[0].size;

        if (size > (1024 * 500)) {

          this.imageError = this.translateService.instant('common.errors.image-size');

          return;
        } else {
          // reading the image in memory with base64 in order to be displayed to the user
          const reader = new FileReader();

          reader.readAsDataURL(input.files[0]);

          reader.onload = (e: any) => {
            this.customerImageURL = e.target && e.target.result;
            this.imageError = '';
          };
        }
      } else {
        // Case not valid extension
        this.imageError = this.translateService.instant('common.errors.image-ext');
      }

    } else {
      this.customerImageURL = this.addUserForm.controls.gender.value === 'm' ?
        'assets/images/male.png' : 'assets/images/female.png';
      this.imageError = '';
    }
  }


  /**
   * Send user data to server in order to update/Add it
   */
  public submit() {
    this.submitted = true;
    if (this.addUserForm.valid) {
      // Holds user data in order to be sent to the service
      const data = {
        ...this.addUserForm.value,
        file: this.customerimage.nativeElement.files[0] ? {
          name: `${this.addUserForm.controls.fname.value}_${this.addUserForm.controls.lname.value}_${+new Date()}`,
          value: this.customerImageURL
        } : null
      };
      if (this.isEditMode) {
        this.usersService.updateUser(data, this.user.id).subscribe(customer => this.handleSuccess(customer));
      } else {
        this.usersService.addUser(data).subscribe(customer => this.handleSuccess(customer));
      }
    }
  }

  // -------------------------------
  //     Private Functions
  // -------------------------------

  /** handle navigation to list view */
  private handleSuccess(customer) {
    this.router.navigate([pages.userManagement.path]);
  }

  /**
   *  Check extensions matches the valid extension or not
   * @param extension represents image acceptable extensions
   */
  private isValidExtension(extension: string) {
    return extension === 'gif' || extension === 'png' || extension === 'jpeg' || extension === 'jpg';
  }

}
