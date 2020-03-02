import React from 'react';
import { Typography, Avatar, Card, Icon, Tooltip } from 'antd';
import frans from 'franc';

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

    paragraph = <Paragraph>
                    {this.props.post.content.split('\n').map(line => 
                        frans(line, {minLength: 2}) === 'fas' 
                        || frans(line, {minLength: 2}) === 'arb'
                        || frans(line, {minLength: 2}) === 'urd'
                        || frans(line, {minLength: 2}) === 'zlm'
                        || frans(line, {minLength: 2}) === 'skr'
                        || frans(line, {minLength: 2}) === 'pbu'
                        || frans(line, {minLength: 2}) === 'uig' ?
                            <div>
                                <Text>
                                    {
                                        line.split(' ').map(word =>
                                            frans(word, {minLength: 2}) === 'fas' 
                                            || frans(word, {minLength: 2}) === 'arb'
                                            || frans(word, {minLength: 2}) === 'urd'
                                            || frans(word, {minLength: 2}) === 'zlm'
                                            || frans(word, {minLength: 2}) === 'skr'
                                            || frans(word, {minLength: 2}) === 'pbu'
                                            || frans(word, {minLength: 2}) === 'uig' ?
                                                <span>
                                                    {word.startsWith("http") ?
                                                    <Tooltip title="Open">
                                                        <a href={word} target="_blank" rel="noopener noreferrer">
                                                            {word}
                                                        </a>
                                                    </Tooltip> : 
                                                    word}
                                                    &nbsp;
                                                </span>
                                            :
                                                <span dir='ltr'>
                                                    &nbsp;
                                                    {word.startsWith("http") ?
                                                    <Tooltip title="Open">
                                                        <a href={word} target="_blank" rel="noopener noreferrer">
                                                            {word}
                                                        </a>
                                                    </Tooltip> : 
                                                    word}
                                                </span>
                                        )
                                    }
                                </Text>
                                <br />
                            </div>
                        :
                            <div dir='ltr'>
                                <Text>
                                    {
                                        line.split(' ').map(word =>
                                            frans(word, {minLength: 2}) === 'fas' 
                                            || frans(word, {minLength: 2}) === 'arb'
                                            || frans(word, {minLength: 2}) === 'urd'
                                            || frans(word, {minLength: 2}) === 'zlm'
                                            || frans(word, {minLength: 2}) === 'skr'
                                            || frans(word, {minLength: 2}) === 'pbu'
                                            || frans(word, {minLength: 2}) === 'uig' ?
                                                <span dir='rtl'>
                                                    {word.startsWith("http") ?
                                                    <Tooltip title="Open">
                                                        <a href={word} target="_blank" rel="noopener noreferrer">
                                                            {word}
                                                        </a>
                                                    </Tooltip> : 
                                                    word}
                                                    &nbsp;
                                                </span>
                                            :
                                                <span dir='ltr'>
                                                    &nbsp;
                                                    {word.startsWith("http") ?
                                                    <Tooltip title="Open">
                                                        <a href={word} target="_blank" rel="noopener noreferrer">
                                                            {word}
                                                        </a>
                                                    </Tooltip> : 
                                                    word}
                                                </span>
                                        )
                                    }
                                </Text>
                                <br />
                            </div>
                    )}
                </Paragraph>;
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
    componentDidMount(){
        console.log(frans('منبع:', {minLength: 2}));
    }
    render(){
        const {isLiked, isDisliked, isCommented, likes_count, dislikes_count, comments_count} = this.state;
        const post = this.props.post;
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
                    style={{marginTop: 25, marginBottom: 25}}
                >
                <Meta
                    avatar={<Avatar src="https://shokoohi.dev/wp-content/uploads/2020/02/ali-shokoohi-avatar.jpg" />}
                    description={this.paragraph}
                />
                </Card>
            </div>
            
        )
    }
}

export default Post;