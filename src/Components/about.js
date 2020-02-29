import React from 'react';
import { Typography, Card, Avatar } from 'antd';
import API from '../api';

const { Meta } = Card;

const { Paragraph, Title, Text } = Typography;

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lines: [],
        }
    }

    componentDidMount(){
        let user = this.props.user;
        if (user.about){
            this.setState({
                lines: user.about.split('\n')
            })
        } else {
            API.get('user/1')
            .then(result => {
                user = result.data
                this.setState({
                    lines: user.about.split('\n')
                })
            });
        }
    }

    render(){
        return(
            <Card
                style={{marginTop: 25, marginBottom: 25}}
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
                description={
                    <Paragraph>
                        {this.state.lines.map(line => 
                            <div>
                                <Text>
                                    {line}
                                </Text>
                                <br />
                            </div>
                        )}
                    </Paragraph>
                }
                />
            </Card>
        )
    }
}

export default About;
