import { Component } from "react";
import { Badge } from "react-bootstrap";


class MyBadge extends Component {
    render() {
        return <Badge variant="secondary" style={{ background: this.props.color }}>{this.props.text}</Badge>
    }
}

export default MyBadge