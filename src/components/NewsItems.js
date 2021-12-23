import React, { Component } from 'react'

export default class NewsItems extends Component {
    render() {
        let { title, description, urlToImage, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card" style={{ width: "17rem" }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: "0"
                    }}>
                      <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={urlToImage} style={{ width: "17rem", height: "12rem" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        {/* not a null true then unknown print, if not of something is false then author print */}
                        <p className="card-text"><small className="text-muted">By {!author ? "Uknown" : author} updated {date} ago</small></p>

                        <a href={newsUrl} target="blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                    {/* target means individual news open in new tabs */}
                </div>
            </div>
        )
    }
}
