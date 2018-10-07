export interface User {
    id: number;
    login: string;
    avatar_url: string;
    /** api details url */
    url: string;
    repos_url: string;
    name?: string;
    company?: string;
    location?: string;
    bio?: string;
    /** stores profile page */
    html_url: string;
    followers_url: string;
}
