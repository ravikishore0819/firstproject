import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Posts } from './posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpClient : HttpClient) { }

  public getPosts(){
    return this.httpClient.get<Posts[]>(this.postsUrl);
}

}
