import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

// const initialColor = {
//   color: "",
//   code: { hex: "" }
// };

const ColorList = ({colors, updateColors}) => {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState({color: "", code: {hex: ""}});
  const [colorToAdd, setColorToAdd] = useState({id: Date.now(), color: "", code: { hex: "" }})

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res)
      setColorToEdit(res.data)
      // updateColors(res.data)
      // setEditing(false)
    })
    .catch(err => console.log(err))
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth().post("/colors", colorToAdd)
    .then(res => {
      updateColors([...colors, colorToAdd])
      setColorToAdd({color: "", code: { hex: "" }})
    })
    .catch(err => console.log(err))
  }

  const deleteColor = color => {
    axiosWithAuth().delete(`/colors/${color.id}`, color)
    .then(res => {
      console.log(res)
      updateColors(res.data)
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <div>
        <p>colors</p>
        <ul>
          {colors.map(color => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span className="delete" onClick={e => {
                      e.stopPropagation();
                      deleteColor(color)
                    }
                  }>
                  x
                </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          ))}
        </ul>
        {editing && (
          <form onSubmit={saveEdit}>
            <legend>edit color</legend>
            <label>
              color name:
              <input
                onChange={e =>
                  setColorToEdit({ ...colorToEdit, color: e.target.value })
                }
                value={colorToEdit.color}
              />
            </label>
            <label>
              hex code:
              <input
                onChange={e =>
                  setColorToEdit({
                    ...colorToEdit,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToEdit.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setEditing(false)}>cancel</button>
            </div>
          </form>
        )}
        <div className="spacer" >
          <form>
            <legend>add color</legend>
            <label>color name: <input type="text" name="color" value={colorToAdd.color} onChange={(e) => {
                  setColorToAdd({
                    ...colorToAdd,
                    color:e.target.value
                  })
            }}/></label>
            <label>hex code: <input type="text" name="color" value={colorToAdd.code.hex} onChange={(e) => {
                  setColorToAdd({
                  ...colorToAdd,
                  code:{hex:e.target.value}
            })}}/></label>
            <button type="submit" onClick={addColor}>add</button>
          </form>
          </div>
      </div>
    </div>
  );
};

export default ColorList;
