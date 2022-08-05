import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SideRecommend.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstPosts } from '../../_actions/post_actions';

const SideRecommend = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);
    const [open, setOpen] = useState(false);

    console.log(posts);
    useEffect(() => {
        const query = {
            skip: 4,
            limit: 4,
        };
        dispatch(getFirstPosts(query));
    }, []);

    const handleOpen = () => {
        setOpen(isOpen => !isOpen);
    };

    const linkTo = postId => {};

    return (
        <div style={{ position: 'sticky', top: '10%', zIndex: '4' }}>
            <div className={open ? 'recommend act' : 'recommend'}>
                <button onClick={handleOpen} className="recommend__button">
                    {' '}
                    ◀{' '}
                </button>
                <section className={open ? 'recommend__section act' : 'recommend__section'}>
                    <ul>
                        {/* <li><img src={posts && posts[0].images[0]}/></li>
                <li><img src={posts && posts[1].images[0]}/></li>
                <li><img src={posts && posts[2].images[0]}/></li>
                <li><img src={posts && posts[3].images[0]}/></li> */}
                        {posts.map(post => (
                            <li key={post._id}>
                                <img src={post.images[0]} />

                                <p>{post.title}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default SideRecommend;
