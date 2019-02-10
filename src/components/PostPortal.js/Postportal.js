// import React, {Component} from 'react';
// import $ from 'jquery';
// import MovieRow from './MovieRow';
// // import axios from 'axios';

// class PostPortal extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             posts:[]
//         }
//     }

   

//     handleSubmit(e){
//         e.preventDefault();
//         e.target.reset();
//     }

//     render(){
//         return(
//             <div>
//             <form className="post_inputs" onSubmit={this.handleSubmit.bind(this)}>
//                 <h3>Search movie posters by title.</h3>
//                 <input onChange={this.searchChangeHandler.bind(this)} style={{
//                     fontSize: 24,
//                     margin: 5,
//                     width: "75%"
//                 }} type="text"/>
//                 <div style={{
//                     display: "inline-block",
//                     alignItems: 'center',
//                     textAlign: 'center',
//                     width: '55%',
//                     height: 450,
//                     overflow: 'auto',
//                     border: '5px solid black',
//                     borderRadius: 10,
//                     margin: 5,
//                     scrollBehavior: "smooth",
//                 }}>
//                      <h3 style={{
//                          display: 'flex',
//                          flexDirection: 'column',
//                          alignItems: 'start',
//                          margin: 10,
//                          marginLeft: 45,
//                          flexWrap: 'wrap',
//                          fontSize: 18,
//                      }}>
//                         {this.state.rows}
//                     </h3>
//                 </div>
//             </form>
//         </div>
//         )
//     }
// }
// export default PostPortal;