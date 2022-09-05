import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    totalResults:0
  }
  static propsType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


   fetchMoreData = async () => {
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ loading: true });
    this.setState({ 
      articles: this.state.articles.concat(parseData.articles), 
      totalResults: parseData.totalResults, 
      loading: false })
  };
   capitalizeFirstLetter = (string) => {
    return string && string.charAt(0).toUpperCase() + string.substring(1);
};
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-Chatpati Khabre`;
  }

  async updateNews(pageNo){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(50);
    this.setState({ loading: true });
    this.setState({ 
      articles: parseData.articles, 
      totalResults: parseData.totalResults, 
      loading: false })

      this.props.setProgress(100);
  }
  async componentDidMount() {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1919f410d8e74d87a99f1e3123c8c13f&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({ loading: true });
    // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
    this.updateNews();


  }
  handelNextFn = async () => {
    //if(!this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1919f410d8e74d87a99f1e3123c8c13f&page=${this.state.page + 1} &pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parseData.articles,
    //   loading: false
    // })
    this.setState({page: this.state.page+1});
 this.updateNews();
  }
  handelPrevFn = async () => {

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1919f410d8e74d87a99f1e3123c8c13f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // this.setState({ loading: true });
    // let parseData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading: false
    // })
    this.setState({page: this.state.page-1});
    this.updateNews();
  }
  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: '30px' }}> Chatpati Khabre- Top {this.capitalizeFirstLetter(this.props.category)} Hedline</h1>
          {/* {this.state.loading && < Spinner />} */}

          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader=<Spinner />
        >
       <div className="container">
          <div className="row">
          
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} source={element.source.name} publishedAt={element.publishedAt} />
              </div>
            })}
          </div>
          </div>
          </InfiniteScroll>
          <div className="container d-flex justify-content-between">
            <button className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handelPrevFn}> &larr;Pervious</button>
            <button className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handelNextFn}>Next &rarr;</button>

          </div>
        </div>

      </>

    )
  }
}

export default News
