import React from 'react'

export default function monstera() {
    return (

        {
            this.state.open &&
    <>
              <Dialog
                   open={this.state.open}
                //   onClose={this.handleClose}
                  onSubmit={this.handleSubmit}
                  aria-labelledby=“Edit a Source”>
              <DialogTitle id=“form-dialog-title”>Book</DialogTitle>
              <DialogContentText>
                    Enter the book information here
            </DialogContentText>
            <DialogContent>
            <TextField
              margin=“dense”
              id=“lastname”
              label=“Author’s Lastname”
              type=“text”
              onChange={this.handleChange}
              value={this.state.lastname}
              fullWidth
            />
              <TextField
               margin=“dense”
               id=“firstname”
               label=“Author’s Firstname”
               type=“text”
               onChange={this.handleChange}
               value={this.state.firstname}
               fullWidth
            />
              <TextField
              margin=“dense”
              id=“title”
              label=“Title of Book”
              type=“text”
              onChange={this.handleChange}
              value={this.state.title}
              fullWidth
            />
                <TextField
              margin=“dense”
              id=“publisher”
              label=“Publisher”
              type=“text”
              onChange={this.handleChange}
              value={this.state.publisher}
              fullWidth
                />
              <TextField
              autoFocus
              margin=“dense”
              id=“date”
              label=“Publication Date”
              type=“year”
              onChange={this.handleChange}
              value={this.state.date}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose} color=“primary”>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit}>
                    Edit Source
            </Button>
          </DialogActions>
              </Dialog >
        </>}
       
    )
}
