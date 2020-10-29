import React from 'react';
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer';

const Filter = (props) => {
    // const dispatch = useDispatch()

    const handleChange = (event) => {
        props.filterChange(event.target.value)
    }

    const style={
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter<input onChange={handleChange} placeholder="search for..."/>
        </div>
    )
    }
// export default Filter
export default connect(null, { filterChange })(Filter)