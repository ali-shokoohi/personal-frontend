import React from 'react';
import {
    Typography,
    Avatar,
    Card,
    Icon,
    Tooltip,
    Comment,
    Form,
    Button,
    List,
    Input,
    message,
    } from 'antd';

const { Paragraph, Text, Title } = Typography;

const { Meta } = Card;

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          ارسال نظر
        </Button>
      </Form.Item>
    </div>
  );

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLiked: false,
            isDisliked: false,
            isCommented: false,
            showComments: false,
            ubmitting: false,
            value: '',
            comments: [],
            likes_count: 0,
            dislikes_count: 0,
            comments_count: 0,
        }
    }

    paragraph = <Paragraph>
                    {this.props.post.content.split('\n').map(line => 
                            <div dir="auto">
                                <Text>
                                    {
                                        line.split(' ').map(word =>
                                                [<span dir="auto">
                                                    {word.startsWith("http://") || word.startsWith("https://") ?
                                                    <Tooltip title="Open">
                                                        <a href={word} target="_blank" rel="noopener noreferrer">
                                                            {word}
                                                        </a>
                                                    </Tooltip> : 
                                                    word}
                                                </span>, ' ']
                                        )
                                    }
                                </Text>
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
        if (!this.state.value) {
            return;
        }
      
        this.setState({
            submitting: true,
          });
        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
            })
            message.success("نظر شما ارسال شد");
        }, 1000)
    }
    handleChange = e => {
        this.setState({
          value: e.target.value,
        });
    }

    componentDidMount(){
        this.setState({
            showComments: this.props.showComments || false,
        })
    }
    render(){
        const {isLiked, isDisliked, isCommented, likes_count, dislikes_count, comments_count, comments, submitting, value } = this.state;
        const post = this.props.post;
        return (
            <div style={{marginTop: 25, marginBottom: 25}} >
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
                        <div onClick={() => {this.setState({showComments: !this.state.showComments})}} >
                            <Icon type="message" theme={isCommented ? 'filled' : 'outlined'} />
                            {comments_count>0 && (<span>{comments_count}</span>)}
                        </div>,
                        <div onClick={this.likeHandler}>
                            <Icon type="like" theme={isLiked ? 'filled' : 'outlined'} />
                            {likes_count>0 && (<span>{likes_count}</span>)}
                        </div>,
                    ]}
                >
                <Meta
                    avatar={<Avatar src="https://shokoohi.dev/wp-content/uploads/2020/02/ali-shokoohi-avatar.jpg" />}
                    description={this.paragraph}
                />
                </Card>
                {
                    this.state.showComments &&
                        <Card style={{backgroundColor: '#f8f9fa'}}>
                            <Comment
                                avatar={
                                    <Avatar
                                        icon={<Icon type="user" />}
                                        src="Author"
                                    />
                                }
                                content={
                                    <Editor
                                        onChange={this.handleChange}
                                        onSubmit={this.commentHandler}
                                        submitting={submitting}
                                        value={value}
                                    />
                                }
                            />
                            {comments.length > 0 && <CommentList comments={comments} />}
                        </Card>
                }
            </div>
            
        )
    }
}

export default Post;