import React, { Component } from "react";
import moment from "moment";
import axios from 'axios';
import {withRouter} from './withRouter';

import Timeline from "react-calendar-timeline";

import generateFakeData from "../generate-fake-data";


var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

//var penguin = Dog()
var ename = localStorage.getItem('username')

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    

    const { groups, items } = generateFakeData();
    const defaultTimeStart = moment()
      .startOf("day")
      .toDate();
    const defaultTimeEnd = moment()
      .startOf("day")
      .add(1, "day")
      .toDate();

    // convert every 2 groups out of 3 to nodes, leaving the first as the root
    // const newGroups = groups.map(group => {
    //   const isRoot = (parseInt(group.id) - 1) % 3 === 0;
    //   const parent = isRoot ? null : Math.floor((parseInt(group.id) - 1) / 3) * 3 + 1;

    //   return Object.assign({}, group, {
    //     root: isRoot,
    //     parent: parent
    //   });
    // });

    this.state = {
      groups: groups,
      items,
      defaultTimeStart,
      defaultTimeEnd,
      openGroups: {}
    };
      
  }
  

  componentDidMount(){
    // This function will run when the component mounts
    axios.post('http://localhost:5000/users_user', {ename}).then((response) => {
      this.setState({ groups: response.data.rows });
    });
    axios.post('http://localhost:5000/tasks_user', {ename}).then((response) => {
        this.setState({ items: response.data.rows });
      });
  }

  // toggleGroup = id => {
  //   const { openGroups } = this.state;
  //   this.setState({
  //     openGroups: {
  //       ...openGroups,
  //       [id]: !openGroups[id]
  //     }
  //   });
  // };

  render() {
    const { groups, items, defaultTimeStart, defaultTimeEnd, openGroups } = this.state;

    // hide (filter) the groups that are closed, for the rest, patch their "title" and add some callbacks or padding
    // const newGroups = groups
    //   .filter(g => g.root || openGroups[g.parent])
    //   .map(group => {
    //     return Object.assign({}, group, {
    //       title: group.root ? (
    //         <div onClick={() => this.toggleGroup(parseInt(group.id))} style={{ cursor: "pointer" }}>
    //           {openGroups[parseInt(group.id)] ? "[-]" : "[+]"} {group.title}
    //         </div>
    //       ) : (
    //         <div style={{ paddingLeft: 20 }}>{group.title}</div>
    //       )
    //     });
    //   });

    return (
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        sidebarWidth={150}
        canMove
        canResize="right"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        showCursorLine
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      />
    );
  }
}

export default withRouter(UserDashboard);