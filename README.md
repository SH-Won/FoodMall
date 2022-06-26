# 💻 Webpack Food Mall
- 본 프로젝트는 React.js 를 사용하여 학습 목적으로 만들어 졌습니다.
- 어머니 당신께서 만드신 음식을 이미지 데이터로 활용하였으며, 쇼핑몰처럼 상품을 보고 장바구니에 담아 수량과 가격을 나타내는 프로젝트 입니다.
## 💡  프로젝트 스택
☀️ **Client**
- **React**
- **React router**
- **Redux**
- **Axios**
- **Webpack**


🌊 **Server**
- **Node.js**
- **Express**
- **mongoose**
- **multer**
- **cloudinary**

## 🏃 실행 방법
순서대로 진행해 주세요

**1. 복제**
```
git clone https://github.com/SH-Won/FoodMall.git
```
**2. mongoose, cloudinary 설정**

```js
// dev.js 
module.exports={
    mongoURI:''
    cloud_name:'',
    api_key:'',
    api_secret:''
}
// 자신의 mongoose, cloudinary 정보를 기입해주세요
```
**3. 관련 모듈 설치**

```
-루트 폴더에서
npm install
cd client ( client 폴더 이동)
npm install
```
**4.실행**

```
루트 폴더에서
npm run dev // 개발 모드로 실행
```
## ⚠️이슈 ##
### <span style="color:red">***API 서버에서 데이터를 가져오지 못함***</span> ###
```js
const request = axios.get('/api/users/auth')
    .then(response=>response.data)
// error
```
* 브라우저 error message
>``http://localhost:3000/api/users/auth 404 (Not Found)``

<span style="color:blue">해결</span>

```js
//webpack.config.js
devServer = {
       ...
       ...
       proxy:{
                  '/api/':{
                      target:'http://localhost:5000',
                  }
              }

}
// 서버의 주소는 localhost:5000/ 이므로 request url 이 localhost:3000/api/users/auth 가 되야한다.
// devServer 의 proxy 설정을 함으로써 에러를 해결하였다.
```
### <span style="color:red">***change event 가 실행될때, 너무 많은 컴포넌트 함수가 실행됨***</span>

- 댓글과 댓글의 댓글을 작성 할수 있는 페이지를 구조화 한다면 아래와 같다.
```
+-- CommentPage ( 최상위 댓글 페이지)
      |-- CommentForm (댓글 작성 form)
      |-- CommentList ( 댓글 목록)
            |-- RootComment
            |     |--CommentForm
            |-- ReplyComment
                  |-- CommentList ( 재귀 방식 )
```
**CommentForm 컴포넌트에 change Handler 함수를 props 로 넘겨 주는 상태이다.**
```jsx
const CommentPage = ({match}) =>{
   const {commentList} =useSelector(state => state.comment);
   const [commentValue,setCommentValue] = useState('');
   const handleChangeComment = e => setCommentValue(e.target.value);

   return (
      <Layout>
            <CommentForm ... onChange={handleChangeComment}/>
            <CommentList commentList={commentList} userData={userData} postId={postId} isReply={false}/>
        </Layout>
   )
}
```
**React 의 re-rendering 되는 경우는 다음과 같다.**
- *자신의 상태(state) 가 변경 될 때*
- *부모 컴포넌트가 re-rendering 될 때*
- *자신이 전달받은 props 가 변경될 때*
- *forceUpdate 함수가 실행 될 때*
>현재 상황에서는 **CommentPage** 의 **commentValue 상태**가 **change event** 에 의해 변화하면서 **re-render** 될것 이다. <span style="color:red">(즉, CommentForm , CommentList 가 re-render)</span>  
**CommentList**가 가지고 있는 댓글의 갯수가 적다면 **성능의 문제**는 생기지 않겠지만 만약 엄청 많은 댓글의 갯수를 가지고 있다고 가정하면, **매번 rendering** 을 하기 때문에 **성능이 저하** 될 것이라고 생각한다

</br>


<span style="color:blue"> **useMemo를 사용하여 이미 렌더링된 댓글을 기억하기(성능의 저하가 눈에띄게 보인다고 가정 합니다)**</span>

```jsx
// CommentList.js
const CommentList = (props) =>{
    const {commentList,userData,postId,isReply} =props;
    const renderCommentList = useMemo(()=>{
        return isReply ? 
         commentList.map(comment => (
              <div key={comment._id} style={{margin:'1rem 0 0 2rem'}}>
                <RootComment comment={comment} userData={userData} postId={postId} />
                <ReplyComment  parentCommentId={comment._id} postId={postId} />
              </div>
        )) :
           commentList.map(comment => (
                !comment.reply &&
            <div key={comment._id} className="single-comment">
            <RootComment comment={comment} userData={userData} postId={postId}/>
            <ReplyComment  parentCommentId={comment._id} postId={postId} />
            </div>
         ))
         },[commentList])

    return (
        <div className="comment-wrap">
          {renderCommentList}
        </div>
    )
}
```
**useMemo 를 사용하여 이미 렌더링된 댓글들은 CommetForm 의 change Event로 다시 렌더링 되지 않도록 기억하는 방법으로 성능저하를 막을 수 있다.**

**useMemo 와 useCallBack 은 성능 최적화를 위한 API 이다. 공식문서에 따르면 렌더링방지 목적으로 사용하지 말도록 권고 되고있다. 정말로 성능 최적화가 필요할 때, 생각을 많이 해보고 사용해야함 을 잊지 말아야 한다.**

## 😎 생각