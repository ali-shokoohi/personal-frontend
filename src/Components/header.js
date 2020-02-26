import React from 'react';
import { PageHeader } from 'antd';
import icon from '../favicon.ico';


class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        const routes = this.props.routes;
        return(
            <PageHeader
                style={{
                }}
                ghost={false}
                onBack={() => null}
                title="علی شکوهی"
                subTitle="وبسایت شخصی علی شکوهی"
                breadcrumb={routes.length>0 && routes}
                extra={this.props.menu}
                avatar={{ src: icon }}
            />
        )
    }
}

export default Header;