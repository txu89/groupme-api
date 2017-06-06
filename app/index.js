var React = require('react')
var ReactDOM = require('react-dom')

var SendMessage = React.createClass({
  storedMessage: "",
  getInitialState: function () {
    return {
      message: ""
    }
  },
  saveMessage: function () {
    this.storedMessage = document.getElementById('message').value
    this.setState({
      message: this.storedMessage
    });
    this.postMessage()
  },
  postMessage: function () {
    $.ajax({
      headers: {
        "X-Access-Token": "BGil3vVRxa89yPYS30uEVochMQ32vKDy4PRcQRxs"
      },
      method: 'POST',
      url: "https://api.groupme.com/v3/groups/11518960/messages",
      dataType: 'json',
      contentType: "application/json",
      data: JSON.stringify({
        "message": {
          "source_guid": Math.floor((Math.random() *1000000) +1),
          "text": this.storedMessage,
        }
      }),
      success: function(results){
        var str = JSON.stringify(results, null, 2);
        $(".display").text(str)
        console.log(results)
      },
      error: function() {
        console.log(this.url)
      }
    })
  },
  render: function () {
    console.log(this.state.message)
    return (
      <div>
        enter message:
        <textarea rows="4" cols="50" id="message"></textarea>
        <button onClick={this.saveMessage}>
          send </button>
        <h3>{this.state.message}</h3>
        <p className="display"></p>
      </div>
    )
  }
})

ReactDOM.render(<SendMessage />,
  document.getElementById('app'))

$.ajax({
  headers: {
    "X-Access-Token": "BGil3vVRxa89yPYS30uEVochMQ32vKDy4PRcQRxs"
  },
  method: 'GET',
  url: "https://api.groupme.com/v3/groups",
  dataType: 'json',
  success: function(results){
    var str = JSON.stringify(results, null, 2);
    $(".display").text(str)
    console.log(results)
  },
  error: function() {
    console.log(this.url)
  }
})
