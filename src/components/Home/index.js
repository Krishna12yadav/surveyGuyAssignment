import {Component} from 'react'
import React from 'react'
import { IoSearch } from "react-icons/io5";
import Pagination from '../Pagination/index'

import './index.css'

class Home extends Component{
    state={searchInput:'',data:''} 

    changeInput=(event)=>{
        this.setState({searchInput:event.target.value})
    }


 
    async componentDidMount(){
        const url='http://hn.algolia.com/api/v1/search?tags=front_page';
        const options={
            method:'GET',
        }
        const res=await fetch(url,options)
        const info=await res.json()
         const bigData=info.hits.map((item)=>{
            return{author:item.author,
                created:item.created_at,
                updated:item.updated_at,
                comments:item.num_comments,
                points:item.points,  
                title:item.title,
                url:item.url              
                
                
            }
        })
       this.setState({data:bigData})

    }

  renderList=()=>{
        const{data}=this.state

        return <ul>{data.map((item)=>{
            const {title,url,comments,points,author}=item 
            
            
 
            return<><h4 className='title'>{title}<span><a className='link' href={url}>({url})</a></span></h4>
        <p><span className='sub-data'>{points} points | {author} author | {comments} comments</span></p></>
        })}  <Pagination/></ul>
         

    }

  

    render(){
        const{searchInput,data}=this.state


        return<div className='main-container'>
            <nav className='nav-container'>
                <div className='logo'>H

                </div>
                <div className='heading-con'>
                    <h2 className='nav-heading'>Search Hacker News</h2>
                </div>
                <div className='search-container'><IoSearch style={{'color':"darkorange",'fontSize':'30px','margin':'5px'}} />
                <input className='inputEl' type="input" value={searchInput} placeholder='Search stories by tirtle, url or author'/></div>
         
                    
            </nav>
          <div className='body-container'>
            <span>Search</span><select><option>Stories</option>
            <option>All</option>
            <option>Comments</option>
            <option>Ask HN</option>
            <option>show HN</option>
            <option>Launch HN</option>
            <option>Jobs</option>
            <option>polls</option>

            </select>
            <span>by</span><select><option>Popularity</option>
            <option>Date</option>
            </select>
            <span>for</span><select><option>All time</option>
            <option>Last 24h</option>
            <option>Past week</option>
            <option>Past Month</option>
            <option>Past year</option>
            <option>Custom range</option></select>

          </div>
          <div className='data-container'>{data===''? <h1>Loading...</h1>:this.renderList()}
         
          </div>
       

            
        </div>
    }
}

export default Home