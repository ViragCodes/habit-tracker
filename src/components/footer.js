function footer({ isEmpty }) {
  return (
    <div className ='footer'>
        <center>
        {isEmpty && "Click on 'ADD NEW' to start a new adventure."} 
        {!isEmpty && "Click on ' + ' after completing the habbit today."}
        </center>
    </div>
  )
}

export default footer