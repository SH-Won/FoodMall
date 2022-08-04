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
### <span style="color:red">***⚡ API 서버에서 데이터를 가져오지 못함***</span> ###
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
### <span style="color:red">***⚡ change event 가 실행될때, 너무 많은 컴포넌트 함수가 실행됨***</span>

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
### 컴포넌트 리렌더링

댓글 컴포넌트를 개발하면서 불필요하게 굳이 리렌더링 하지 않아도 되는 컴포넌트가 렌더링이되서 리렌더링에 대해서 공부 하게 되었습니다. 

컴포넌트가 리렌더링 되는 경우는 

1. 자신의 state 가 변경 될 때,
2. props 가 변경 될 때,
3. 부모가 리렌더링 될 때,
4. this.forceUpdate 로 강제로 업데이트 할 때

입니다. 

함수형 컴포넌트에서 리렌더링이 되면 함수를 다시 실행 시키고 함수 안의 어떤 작업을 수행하는 함수도 다시 만들어 집니다. 같은 작업을 수행하는 함수라도 둘은 완전히 다른 객체 이기 때문에, 만약 자식 컴포넌트로 props 로 넘겨주고 있고, 굳이 렌더링 하지 않아도 되는 자식 컴포넌트는 불필요하게 리렌더링 될 수 있습니다. 자연스럽게 최적화를 위해 useMemo , useCallback hooks 를 공부 하게 되었고, 공식문서에 따르면 리렌더링 방지 목적으로 사용을 권장하고 있지 않다고 하여 렌더링 관련해서 더 많은 공부가 필요하다라는 것을 느꼈습니다.  

---

### Redux 를 이용한 상태 관리

최상위 부모 컴포넌트에서 props 로 상태를 전달 하는 것이 아니라 Redux 와 useSelector hooks 를 사용하여 상태 관리를 했습니다. 만약 컴포넌트의 구조가 깊다면, props 로 상태를 전달 하는 것이 매우 힘든 일이 될 것이라고 생각합니다.  하지만 구조가 복잡하지 않은 경우 Redux 를 반드시 사용해야 할까? 라는 의문이 들었습니다. Redux 는 복잡한 상태 관리를 단방향 데이터 흐름체계로 만들어주는 도구이고, 구조가 간단한 경우에는 굳이 Redux 를 사용할 필요가 없다고 생각하기 때문입니다. 꼭 Redux 뿐만 아니라 무엇이든지 사용할 때, 사용했을때의 이점과 사용하지 않을때 의 이득과 손실을 따져서 도구를 사용하는게 현명한 판단을 하는 것이라고 생각합니다.