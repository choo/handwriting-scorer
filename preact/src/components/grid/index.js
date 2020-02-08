/**
 * component only for grid
 * props: 
 *    container: flex container or not
 *    m: margin
 *    p: padding
 *    flex: flex
 */
const Grid = (props) => {
  const gridStyle = {
    display: props.container ? 'flex' : null,
    margin : props.m,
    padding: props.p,
    flex: props.flex,
    alignItems: props.alignItems, // center, baseline, ...
    justifyContent: props.justify,
    justifyItems: props.justify,
    ...props.style
  };

  return (
    <div style={gridStyle}>
      {props.children}
    </div>
  );
};

export default Grid;
