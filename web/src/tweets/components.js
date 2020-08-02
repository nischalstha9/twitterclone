import React, {useEffect, useState} from "react"

import { loadTweets } from "../lookup";
  
  export function TweetsList(){
    const [tweets, setTweets] = useState([])
    useEffect(() => {
      //do api lookup
      const myCallback = (response, status) => {
        if (status === 200){
          setTweets(response)
        }else{
          alert("there was an error")
        }
      }
      loadTweets(myCallback)
    },[])
    return tweets.map((item, index) => {
      return <Tweet tweet={item} className='bg-white text-dark' key={`${index}-${item.id}`}/>
    })
  }

  export function ActionBtn(props) {
    const {tweet, action} = props
    const className = props.className ? props.className : "btn btn-primary btn-sm"
    const actionDisplay = action.display ? action.display : 'Action'
    const display = action.type ==='like' ? `${tweet.likes} ${actionDisplay}` : actionDisplay
    const handleClick = (event) => {
      event.preventDefault()
      if(action.type ==='like'){
        console.log(tweet.likes + 1);
      }
    }

    return action.type === "like" ? <button className={className} onClick={handleClick}>{display}</button> : <button className={className}>{actionDisplay}</button>
  }

  export function Tweet(props){
    const {tweet} = props
    const className = props.className ? props.className:"col-10 mx-auto col-md-6"
    return <div className={className}>
      <p>{tweet.id} | {tweet.content}</p>
      <div className = 'btn btn-group'>
        <ActionBtn tweet={tweet} action={{type: "like", display:'like'}}/>
        <ActionBtn tweet={tweet} action={{type: "unlike", display:'Unlike'}}/>
        <ActionBtn tweet={tweet} action={{type: "retweet", display:'Retweet'}}/>
      </div>
    </div>
  }
  
