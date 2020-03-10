import Grid from '../../atoms/grid';

/**
 * props {
 *  elms,
 *  width,
 *  makeCell(),
 * }
 */
const GridList = props => {
  const n = props.elms.length;
  const w = props.width;
  const r = Math.ceil(n / w);
  const ret = [];
  for (let y = 0; y < r; y++) {
    const rowElms = props.elms.slice(y * w, (y + 1) * w);
    const lack = w - rowElms.length;
    for (let _ = 0; _ < lack; _++) {
      rowElms.push(null);
    }
    ret.push(
      <Grid container key={y} justify='space-between' alignItems='stretch'>
        {rowElms.map((info, x) => {
          const idx = w * y + x;
          return (
            <Grid flex={1/w} p={props.p || ''} key={idx}>
              {info ? props.makeCell(info, idx) : null}
            </Grid>
          );
        })}
      </Grid>
    );
  }
  return ret;
};

export default GridList;
