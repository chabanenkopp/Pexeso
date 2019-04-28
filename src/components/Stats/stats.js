import List from '../List'
import {withList} from '../hoc'

const Comments = withList(List, 'comments');
const Scores = withList(List, 'scores');

export {Comments, Scores}