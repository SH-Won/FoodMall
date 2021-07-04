import React from 'react'
import TabBoard from './TabBoard';
import TabComment from './TabComment';
import TabDetail from './TabDetail';

const Tab = (props) => {
    const url = props.match.params.name;
    console.log('props.match',props.match);

   switch(url){
     
       
       case 'board' :
           return <TabBoard/>
       case 'comment' :
           return <TabComment/>
       default : return <TabDetail/>
       
   }
}

export default Tab
