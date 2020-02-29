import React from 'react';
import { Row, Col, Menu, Icon, Spin, Typography } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/header';
import Post from './Components/post';
import About from './Components/about';
import './App.css';
import 'antd/dist/antd.css';
import API from './api';
import { BackTop } from 'antd';

const { SubMenu } = Menu;

const { Text } = Typography;

const routes = [
  {
    path: '',
    breadcrumbName: 'Home',
  },
  {
    path: 'Learining',
    breadcrumbName: 'Learning',
  },
  {
    path: 'Programming',
    breadcrumbName: 'Programming',
  },
  {
    path: 'Python',
    breadcrumbName: 'Python',
  }
];

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          spinning: true,
          current: 'home',
          categories: [],
          groups: [],
          posts: [],
          user: {}
      }
  }
  handleClick = e => {
      console.log('click ', e);
      this.setState({
      current: e.key,
      });
  };

  componentDidMount(){
      API.get('category')
      .then(result => {
          this.setState({
              categories: result.data
          });
          this.state.categories.map(category => {
            return category.Groups.map(group => {
              this.state.groups.push(group);
              return group.Posts.map(post => {
                return this.state.posts.push(post);
              })
            })
          });
      });
      API.get('user/1')
      .then(result => {
          this.setState({
              user: result.data
          })
      });
      this.setState({
        spinning: false
      });
  }
  render(){
    const menu = [
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="home">
          <Link to="/">
            <Icon type="home" />
            خانه
          </Link>
          </Menu.Item>
          <Menu.Item key="about">
          <Link to="/about">
            <Icon type="info-circle" />
            درباره من
          </Link>
          </Menu.Item>
          <SubMenu
          title={
              <span className="submenu-title-wrapper">
              <Icon type="book" />
              <Link to="/learning">آموزش</Link>
              </span>
          }
          >
          {this.state.categories.map(category =>
              <Menu.ItemGroup title={category.name}>
              {category.Groups.map(group => 
                  <Menu.Item key={group.id} title={group.description}>
                    <Link to={`/learning/${group.name}`}>{group.name}</Link>
                  </Menu.Item>
              )
              }
              </Menu.ItemGroup>
          )
          }
          </SubMenu>
          <Menu.Item key="alipay">
          <a href="https://shokoohi.dev" target="_blank" rel="noopener noreferrer">
              <Icon type="link" />
              وبلاگ
          </a>
          </Menu.Item>
      </Menu>
    ];
    return (
      <div dir='rtl' style={{backgroundColor: '#F5EFE0', backgroundRepeat: true, height: '100%', minHeight: '100vh'}}>
        <Spin tip="Loading..." spinning={this.state.spinning} size="large">
          <Router>
            <div>
              <Header
                routes={routes}
                menu={menu}
              />
              <Switch>
                <Row>
                  <Col xs={20} sm={20} md={20} lg={20} xl={20} offset={2}>
                    <Route exact path="/">
                    {
                      this.state.groups.map(group => 
                        group.Posts.map(post =>
                          <Post post={post} />
                        )
                      )
                    }
                    </Route>
                    <Route exact path="/learning">
                    {
                      this.state.groups.map(group => 
                        group.Posts.map(post =>
                          <Post post={post} />
                        )
                      )
                    }
                    </Route>
                    {
                      this.state.groups.map(group =>
                        <Route exact path={`/learning/${group.name}`}>
                          {
                            group.Posts.map(post =>
                              <Post post={post} />
                            )
                          }
                        </Route>
                      )
                    }
                    <Route exact path="/about">
                      <About user={this.state.user} />
                    </Route>
                    <Route exact path="/test">
                      <Text style={{backgroundColor: 'red'}}>{'         Hello  s'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'  s'}</Text>
                    </Route>
                  </Col>
                </Row>
              </Switch>
            </div>
          </Router>
        </Spin>
        <BackTop />
      </div>
    );
  }
}

export default App;
