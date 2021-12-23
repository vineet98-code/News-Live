import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)} - News-Live`;

    }
    async updatedNews() {
        this.props.setProgress(5);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2ae003068ce54cd8b6bbb52513e687ae&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        this.setState({
            articles: data.articles,
            totalArticles: data.totalResults,
            loading: false,
            totalResults: data.totalResults
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updatedNews();
    }
    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updatedNews();
    // }

    // Math.ceil means 4.6 = 5
    // handleNextClick = async () => {

    //     this.setState({ page: this.state.page + 1 });
    //     this.updatedNews();
    // }
    
    fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=2ae003068ce54cd8b6bbb52513e687ae&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalArticles: data.totalResults,
            totalResults: data.totalResults
        });
    };

    render() {
        return (
            <div>
                <h2 className="d-flex justify-content-center my-3">News - Daily {this.capitalize(this.props.category)} Headlines</h2>
                {/* If this is true then show loading else not */}

                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >

                <div className="container d-flex flex-wrap justify-content-around ">
                    {this.state.articles.map((article) => {
                        return (
                            <div className="my-3" key={article.url}>
                                <NewsItems
                                    title={article.title ? article.title.slice(0, 40) : ""}
                                    description={article.description ? article.description.slice(0, 80) : ""}
                                    urlToImage={article.urlToImage}
                                    newsUrl={article.url}
                                    author={article.author}
                                    date={article.publishedAt}
                                    source={article.source.name}
                                    />
                            </div>
                        )
                    })}
                </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}
