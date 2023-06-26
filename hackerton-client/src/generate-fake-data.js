export default function (groupCount = 30, itemCount = 1000, daysInPast = 30) {
    let groups = []
      groups.push({
        id: `1`,
        title: '',
        rightTitle: '',
        bgColor: ''
      })
  
  
    let items = []
      items.push({
        id: 1,
        group: '',
        title: '',
        start: 1,
        end: 1,
        // canMove: startValue > new Date().getTime(),
        // canResize: startValue > new Date().getTime() ? (endValue > new Date().getTime() ? 'both' : 'left') : (endValue > new Date().getTime() ? 'right' : false),
        className: '',
        // itemProps: {
        //   'data-tip': faker.hacker.phrase()
        // }
      })
  
    items = items.sort((a, b) => b - a)
  
    return { groups, items }
  }
  