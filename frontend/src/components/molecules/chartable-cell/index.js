import Grid from '../../atoms/grid';
import Button from '../../atoms/button';

const CharTableCell = props => {
  return (
    <>
      {props.c && (
        props.makeButton ? (
          props.makeButton(props.charCode, props.charType, props.c)
        ) : (
          <Button outlined
            onClick={(e) => props.onSelectChar(props.charCode)}
            style={{
              minWidth: '48px',
              fontSize: '16px',
              fontFamily: "Noto Serif JP",
            }}
          >
            {props.c}
          </Button>
        )
      )}
    </>
  )
};

export default CharTableCell;
