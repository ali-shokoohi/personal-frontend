import React from 'react';
import { Typography, Card, Avatar } from 'antd';

const { Meta } = Card;

const { Paragraph, Title } = Typography;

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
    }

    render(){
        const user = this.props.user;
        return(
            <Card
                style={{marginTop: 50}}
                cover={
                <img
                    alt="Ali-Shokoohi"
                    src="https://shokoohi.dev/wp-content/uploads/2020/01/sheeps.jpg"
                />
                }
            >
                <Meta
                avatar={<Avatar src="https://shokoohi.dev/wp-content/uploads/2020/02/ali-shokoohi-avatar.jpg" />}
                title={
                    <Title level={4}>
                        درباره من
                    </Title>
                }
                description={<Paragraph>{user.about}</Paragraph>}
                />
            </Card>
        )
    }
}

export default About;