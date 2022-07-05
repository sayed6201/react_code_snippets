====================================
Getting data from input fields on enter pressed
====================================

 <input 
                type="text" 
                placeholder='Enter Movie name' 
                // value={'Superman'}
                // onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                if (event.key === 'Enter') {
                  searchMovies(event.target.value)
                }
              }}
                 />
           