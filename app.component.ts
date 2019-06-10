import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Posts } from './posts';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  
  title = 'download-nrx';

  private posts=[];

  constructor(private postsService : PostsService){
  }

  ngOnInit() {
    this.postsService.getPosts().subscribe((res)=>{
      console.log(res);
      this.posts = res;

      new ngxCsv(this.posts, 'test');
    });      
  }

  
}
