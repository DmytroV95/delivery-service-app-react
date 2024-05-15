# Delivery Service App (Front-end part) 

## Project overview

1. Implemented 2 new pages accessible via URLs: Entity List and Entity Detail.
####
2. **Entity List Page**:
    - Displays a list of entities created in previous tasks.
    - Each entity in the list displays basic fields like cargo number, description, delivery status, vehicle number and vehicle type.
    - Hovering over an entity reveals a delete icon button. Clicking it opens a dialog confirming entity deletion. Upon confirmation and successful deletion, the entity disappears from the list, accompanied by a user-friendly success message.
    - Clicking on an entity navigates the user to the "Entity Detail" page.
    - Provides a "New cargo" button for navigating to the "Entity Details" page in edit mode with empty fields.
    - Includes a "Filter" button with multiple fields for filtering the entity list. Server side filtering is implemented.
    - Implements pagination for the entity list.
    - Applied filters and pagination persist upon page reload.
####
3. **Entity Details Page**:
    - Displays entity details in "View" and "Edit" modes.
    - Upon landing, the page opens in "View" mode with all entity fields displayed.
    - In "View" mode, clicking the "Edit" icon switches to "Edit" mode.
    - "Edit" mode allows editing of all entity fields with "Save" and "Cancel" buttons. Clicking "Save" sends edits to the backend. Success message appears upon successful saving.
    - Field validation occurs on the UI upon clicking "Create". Invalid fields are highlighted, and the request is sent only if all fields pass validation.
    - Switching to "Edit" mode, making edits, and clicking "Cancel" reverts the entity to "View" mode with old field values.
    - Opening the page to create a new entity immediately opens in "Edit" mode. Buttons are labeled "Create" and "Cancel".
    - Includes a "Back" button for convenient navigation to the "Entity List" page. Filters and pagination remain unchanged.

# ENJOY EXPLORING!!!