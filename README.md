# π» Webpack Food Mall
- λ³Έ νλ‘μ νΈλ React.js λ₯Ό μ¬μ©νμ¬ νμ΅ λͺ©μ μΌλ‘ λ§λ€μ΄ μ‘μ΅λλ€.
- μ΄λ¨Έλ λΉμ κ»μ λ§λμ  μμμ μ΄λ―Έμ§ λ°μ΄ν°λ‘ νμ©νμμΌλ©°, μΌνλͺ°μ²λΌ μνμ λ³΄κ³  μ₯λ°κ΅¬λμ λ΄μ μλκ³Ό κ°κ²©μ λνλ΄λ νλ‘μ νΈ μλλ€.
## π‘  νλ‘μ νΈ μ€ν
βοΈ **Client**
- **React**
- **React router**
- **Redux**
- **Axios**
- **Webpack**


π **Server**
- **Node.js**
- **Express**
- **mongoose**
- **multer**
- **cloudinary**

## π μ€ν λ°©λ²
μμλλ‘ μ§νν΄ μ£ΌμΈμ

**1. λ³΅μ **
```
git clone https://github.com/SH-Won/FoodMall.git
```
**2. mongoose, cloudinary μ€μ **

```js
// dev.js 
module.exports={
    mongoURI:''
    cloud_name:'',
    api_key:'',
    api_secret:''
}
// μμ μ mongoose, cloudinary μ λ³΄λ₯Ό κΈ°μν΄μ£ΌμΈμ
```
**3. κ΄λ ¨ λͺ¨λ μ€μΉ**

```
-λ£¨νΈ ν΄λμμ
npm install
cd client ( client ν΄λ μ΄λ)
npm install
```
**4.μ€ν**

```
λ£¨νΈ ν΄λμμ
npm run dev // κ°λ° λͺ¨λλ‘ μ€ν
```
## β οΈμ΄μ ##
### <span style="color:red">***API μλ²μμ λ°μ΄ν°λ₯Ό κ°μ Έμ€μ§ λͺ»ν¨***</span> ###
```js
const request = axios.get('/api/users/auth')
    .then(response=>response.data)
// error
```
* λΈλΌμ°μ  error message
>``http://localhost:3000/api/users/auth 404 (Not Found)``

<span style="color:blue">ν΄κ²°</span>

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
// μλ²μ μ£Όμλ localhost:5000/ μ΄λ―λ‘ request url μ΄ localhost:3000/api/users/auth κ° λμΌνλ€.
// devServer μ proxy μ€μ μ ν¨μΌλ‘μ¨ μλ¬λ₯Ό ν΄κ²°νμλ€.
```
### <span style="color:red">***change event κ° μ€νλ λ, λλ¬΄ λ§μ μ»΄ν¬λνΈ ν¨μκ° μ€νλ¨***</span>

- λκΈκ³Ό λκΈμ λκΈμ μμ± ν μ μλ νμ΄μ§λ₯Ό κ΅¬μ‘°ν νλ€λ©΄ μλμ κ°λ€.
```
+-- CommentPage ( μ΅μμ λκΈ νμ΄μ§)
      |-- CommentForm (λκΈ μμ± form)
      |-- CommentList ( λκΈ λͺ©λ‘)
            |-- RootComment
            |     |--CommentForm
            |-- ReplyComment
                  |-- CommentList ( μ¬κ· λ°©μ )
```
**CommentForm μ»΄ν¬λνΈμ change Handler ν¨μλ₯Ό props λ‘ λκ²¨ μ£Όλ μνμ΄λ€.**
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
**React μ re-rendering λλ κ²½μ°λ λ€μκ³Ό κ°λ€.**
- *μμ μ μν(state) κ° λ³κ²½ λ  λ*
- *λΆλͺ¨ μ»΄ν¬λνΈκ° re-rendering λ  λ*
- *μμ μ΄ μ λ¬λ°μ props κ° λ³κ²½λ  λ*
- *forceUpdate ν¨μκ° μ€ν λ  λ*
>νμ¬ μν©μμλ **CommentPage** μ **commentValue μν**κ° **change event** μ μν΄ λ³ννλ©΄μ **re-render** λ κ² μ΄λ€. <span style="color:red">(μ¦, CommentForm , CommentList κ° re-render)</span>  
**CommentList**κ° κ°μ§κ³  μλ λκΈμ κ°―μκ° μ λ€λ©΄ **μ±λ₯μ λ¬Έμ **λ μκΈ°μ§ μκ² μ§λ§ λ§μ½ μμ²­ λ§μ λκΈμ κ°―μλ₯Ό κ°μ§κ³  μλ€κ³  κ°μ νλ©΄, **λ§€λ² rendering** μ νκΈ° λλ¬Έμ **μ±λ₯μ΄ μ ν** λ  κ²μ΄λΌκ³  μκ°νλ€

</br>


<span style="color:blue"> **useMemoλ₯Ό μ¬μ©νμ¬ μ΄λ―Έ λ λλ§λ λκΈμ κΈ°μ΅νκΈ°(μ±λ₯μ μ νκ° λμλκ² λ³΄μΈλ€κ³  κ°μ  ν©λλ€)**</span>

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
**useMemo λ₯Ό μ¬μ©νμ¬ μ΄λ―Έ λ λλ§λ λκΈλ€μ CommetForm μ change Eventλ‘ λ€μ λ λλ§ λμ§ μλλ‘ κΈ°μ΅νλ λ°©λ²μΌλ‘ μ±λ₯μ νλ₯Ό λ§μ μ μλ€.**

**useMemo μ useCallBack μ μ±λ₯ μ΅μ νλ₯Ό μν API μ΄λ€. κ³΅μλ¬Έμμ λ°λ₯΄λ©΄ λ λλ§λ°©μ§ λͺ©μ μΌλ‘ μ¬μ©νμ§ λ§λλ‘ κΆκ³  λκ³ μλ€. μ λ§λ‘ μ±λ₯ μ΅μ νκ° νμν  λ, μκ°μ λ§μ΄ ν΄λ³΄κ³  μ¬μ©ν΄μΌν¨ μ μμ§ λ§μμΌ νλ€.**

## π μκ°