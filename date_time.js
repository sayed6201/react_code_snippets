// ==================================== 
// timeago.js
// shows -> 1 month ago, 1 day ago etc ...
// ==================================== 
// "timeago.js": "^4.0.2",
import {format} from "timeago.js"
<td className="widgetLgDate">{format(order.createdAt)}</td>






// ==================================== 
// Moment
// ==================================== 

// import moment from 'moment';
{
<span>
{moment(post.createdAt).format('MMM DD, YYYY')}
</span>
}