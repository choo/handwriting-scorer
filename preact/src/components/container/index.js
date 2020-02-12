/**
 * component only for centering
 */
const Container = (props) => (
  <div style={{
    marginLeft: 'auto',
    marginRight: 'auto',
    ...props.style,
  }}>
    {props.children}
  </div>
);

export default Container;
