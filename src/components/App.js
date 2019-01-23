import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import Post from "./Post/Post"

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios
    .get("https://practiceapi.devmountain.com/api/posts")
    .then((response) =>{
      console.log("Got it")
      this.setState({
        posts:[this.state.posts, ...response.data]
      })
    }).catch((error) => console.log("There has been an error mounting this post"))
  }

  updatePost(id,text) {
    axios
    .put(`https://practiceapi.devmountain.com/api/posts?id=${id} text=${text}`)
    .then((response) =>{
      console.log("Edited post")
      this.setState({
        posts:response.data
      })
    }).catch((err) => console.log("Error updating post"))

  }

  deletePost(id,text) {
    axios
    .delete(`https://practiceapi.devmountain.com/api/posts?id=${id} text=${text}`)
    .then((response) =>{
      console.log("deleted post")
      this.setState({
        posts:response.data
      })
    }).catch((err) => console.log("Error deleting post"))    
  }

  createPost(id,text) {
    axios
    .post(`https://practiceapi.devmountain.com/api/posts?id=${id} text=${text}`)
    .then((response) =>{
      console.log(response)
      console.log("added post")
      this.setState({
        posts:response.data
      })
    }).catch((err) => console.log("Error adding post"))
  }

  render() {
    const { posts } = this.state;
    console.log(posts)
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
      {
        posts.map( post => (
          <Post key={ post.id }
                text={ post.text}
                date={ post.date }
                id = {post.id}
                updatePostFn ={this.updatePost}
                deletePostFn = {this.deletePost}/>
        ))
      }  
      <Compose createPostFn = {this.createPost}/>      
          
          
        </section>
      </div>
    );
  }
}

export default App;
