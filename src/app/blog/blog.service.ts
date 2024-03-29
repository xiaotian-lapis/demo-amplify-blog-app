import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { IBlog, IBlogApiResponse } from './blog.model';
import { get } from 'aws-amplify/api';

@Injectable()
export class BlogService {

  /**
   * Get blog from backend api
   */
  getBlogs(): Observable<IBlog[]> {
    //return isDevMode() ? this.getBlogsForDev() : this.getBlogsForProd();
    return this.getBlogsForProd();
  }

  // private getBlogsForDev(): Observable<IBlog[]> {
  //   return this.http.get<IBlog[]>(this.apiUrl).pipe(
  //     map(blogs => this.processBlogs(blogs))
  //   );
  // }

  private getBlogsForProd(): Observable<IBlog[]> {
    return from(this.getResponseJsonFromAmplify()).pipe(
      map(json => {
        const blogs = json.data || [];
        return this.processBlogs(blogs);
      }),
      catchError(error => {
        console.error('GET call failed: ', error);
        return throwError(error);
      })
    );
  }

  private processBlogs(blogs: IBlog[]): IBlog[] {
    return blogs.map(blog => ({
      ...blog,
      createdTime: new Date(blog.createdTime),
      updatedTime: new Date(blog.updatedTime)
    }));
  }

  private async getResponseJsonFromAmplify(): Promise<IBlogApiResponse> {
    try {
      const restOperation = get({
        apiName: 'blogsApi',
        path: '/blogs'
      });
      console.log('GET call succeeded: ');
      const response = await restOperation.response;
      const jsonResponse: unknown = await response.body.json();

      if (this.isBlogApiResponse(jsonResponse)) {
        return jsonResponse;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('GET call failed: ', error);
      throw error;
    }
  }

  private isBlogApiResponse(object: any): object is IBlogApiResponse {
    return 'data' in object && Array.isArray(object.data);
  }
}
