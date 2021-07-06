import React, {Component} from 'react';

class App extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }
    addTask(e){
        if(this.state._id){
         console.log(this.state._id)
         fetch(`/api/task/${this.state._id}`, {
         method: 'PUT',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            }
         })
         .then(res => res.json())
         .then(data => {
             console.log(data);
             M.toast({html: 'Task Updated!'})
             this.setState({title: '', description: '', id: ''})
             this.fetchTasks()

            
        })


        }else{
            fetch('/api/task',{
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Task saved!'})
                    this.setState({title: '', description: ''})
                    this.fetchTasks()
    
                })
                .catch(err => console.log(err))
    
        }
     
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks()
    }

    fetchTasks(){
        fetch('/api/task')
        .then(res => res.json())
        .then(data => 
          {
            this.setState({tasks: data})
            console.log(this.state.tasks)
          }
        );
    }
    editTask(id){
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            });
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    deleteTask(id){
        if(confirm('Are you sure want to delete if?')){
            fetch(`/api/task/${id}`,{    
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                M.toast({html: 'Task Deleted!'})
                this.fetchTasks()
            })
        }
    }

    render(){
        return(
            <div>
                {/* navegation */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo">MERN Stack</a>
                    </div> 
                </nav>
                {/* componente principal */}
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea onChange={this.handleChange} name="description" className="materialize-textarea" type="text" placeholder="Task Description"  value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">
                                            send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div> 
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            title
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" 
                                                        onClick={() => this.deleteTask(task._id)} style={{margin: '4px'}}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4"
                                                        onClick={() => this.editTask(task._id)} style={{margin: '4px'}}>

                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>

                                                </tr>

                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App