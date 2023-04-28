import React, { Component } from "react";

export class NewsItem extends Component {
  constructor(){
    super();
    
  }
  render() {
    let { title, description, imageUrl, newsUrl,author,date } = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <img src={!imageUrl?"https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted"> By {!author?"unknow": author} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="blank" className="btn btn-sm btn-dark">
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
