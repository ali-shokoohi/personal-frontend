import React from 'react';
import { Typography, Avatar, Card, Icon } from 'antd';

const { Paragraph, Text, Title } = Typography;

const { Meta } = Card;

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLiked: false,
            isDisliked: false,
            isCommented: false,
            likes_count: 0,
            dislikes_count: 0,
            comments_count: 0,
        }
    }
    componentDidMount(){
    }

    likeHandler = () => {
        this.state.isLiked ?
            this.setState({
                isLiked: !this.state.isLiked,
                likes_count: this.state.likes_count-1,
                isDisliked: false,
                dislikes_count: this.state.dislikes_count > 0 ? this.state.dislikes_count - 1 : this.state.dislikes_count,
            })
        :
            this.setState({
                isLiked: !this.state.isLiked,
                likes_count: this.state.likes_count+1,
                isDisliked: false,
                dislikes_count: this.state.dislikes_count > 0 ? this.state.dislikes_count - 1 : this.state.dislikes_count,
            })
    }
    dislikeHandler = () => {
        this.state.isDisliked ?
            this.setState({
                isDisliked: !this.state.isDisliked,
                dislikes_count: this.state.dislikes_count-1,
                isLiked: false,
                likes_count: this.state.likes_count > 0 ? this.state.likes_count - 1 : this.state.likes_count,
            })
        :
            this.setState({
                isDisliked: !this.state.isDisliked,
                dislikes_count: this.state.dislikes_count+1,
                isLiked: false,
                likes_count: this.state.likes_count > 0 ? this.state.likes_count - 1 : this.state.likes_count,
            })
    }
    commentHandler = () => {
        this.setState({
            isCommented: true,
            comments_count: this.state.comments_count+1,
        })
    }
    render(){
        const {isLiked, isDisliked, isCommented, likes_count, dislikes_count, comments_count} = this.state;
        const post = this.props.post;
        const lines = post.content.split('\n');
        return (
            <div>
                <Card
                    title={
                        <Title level={4}>
                            {post.title}
                        </Title>
                    }
                    cover={this.props.cover && (this.props.cover)}
                    hoverable={true}
                        extra={<a href={post.id}>بیشتر</a>}
                    actions={[
                        <div onClick={this.dislikeHandler} >
                            <Icon type="dislike" theme={isDisliked ? 'filled' : 'outlined'}/>
                            {dislikes_count>0 && (<span>{dislikes_count}</span>)}
                        </div>,
                        <div onClick={this.commentHandler} >
                            <Icon type="message" theme={isCommented ? 'filled' : 'outlined'} />
                            {comments_count>0 && (<span>{comments_count}</span>)}
                        </div>,
                        <div onClick={this.likeHandler}>
                            <Icon type="like" theme={isLiked ? 'filled' : 'outlined'} />
                            {likes_count>0 && (<span>{likes_count}</span>)}
                        </div>,
                    ]}
                    style={{marginTop: 25}}
                >
                <Meta
                    avatar={<Avatar src="https://shokoohi.dev/wp-content/uploads/2020/02/ali-shokoohi-avatar.jpg" />}
                    description={
                        <Paragraph ellipsis={{ rows: lines.length+2, expandable: true }}>
                            {lines.map(line =>
                                <div>
                                    <Text>{line}</Text>
                                    <br />
                                </div>
                            )}
                        </Paragraph>
                    }
                />
                </Card>
            </div>
            
        )
    }
}

export default Post;