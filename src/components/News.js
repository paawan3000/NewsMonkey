import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps ={
    country: 'in',
    pageSize: 8,
    category: 'general',
    author:'author',
    date:'publishedAt'
    
  }

  static propsTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
  constructor(props){
    super(props);
    console.log("Hello I am constructor from News component");
    this.state = {
      articles: [],
      loading :false,
      page:1,
      totalResults: 0,
      
    }
    document.title =`${this.Capitalize(this.props.category)} - NewsMonkey`
  }
  
  async componentDidMount(){
 
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b54cbff16c8745c1ac5e9e89c6c50b0a&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(70);
    console.log(parseData);
    this.setState({articles: parseData.articles, totalResults: parseData.totalResults,
    loading: false,
  })
  this.props.setProgress(100);
  }

  handlePrevClick = async ()=>{
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=b54cbff16c8745c1ac5e9e89c6c50b0a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading : false


    })
  }


  handleNextClick = async ()=>{
    console.log("Next");
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b54cbff16c8745c1ac5e9e89c6c50b0a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parseData = await data.json()
  
    this.setState({
      page: this.state.page + 1,
      articles: parseData.articles,
      loading:false


    })
  }

  }
  
  fetchMoreData = async() => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b54cbff16c8745c1ac5e9e89c6c50b0a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
  })
    
  };




  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: ' 35px 0px'}}>NewsMonkey - Top {this.Capitalize(this.props.category)} Headlines</h1>
        {/* {this.state.loading && < Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container"> 
        <div className=" row">
          { this.state.articles.map((element )=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl = {element.url} author ={element.author} date={element.publishedAt} />
          </div> 
          })}
          
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick = {this.handlePrevClick}>&laquo; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick = {this.handleNextClick}>Next &raquo; </button>
        </div> */}
        </>
    );
  }
}

export default News;
