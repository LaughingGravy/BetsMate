import React from 'react'
import intl from 'react-intl-universal'
import { Button } from 'semantic-ui-react'

const AdminTableButtonGroup = ({ handleCreate, handleEdit, handleDelete, activeRows }) => {
  const anySelectedRows = Object.entries(activeRows).some(e => e[1] == true)

  return (
    <Button.Group>
      <Button secondary onClick={(e) => handleCreate(e, activeRows)}>{intl.get("admin-create-button-label")}</Button>
      <Button secondary disabled={!anySelectedRows} onClick={(e) => handleEdit(e, activeRows)}>{intl.get("admin-edit-button-label")}</Button>
      <Button secondary disabled={!anySelectedRows} onClick={(e) => handleDelete(e, activeRows)}>{intl.get("admin-delete-button-label")}</Button>
    </Button.Group>
  )
}

export default AdminTableButtonGroup