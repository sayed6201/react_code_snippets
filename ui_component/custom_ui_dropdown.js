// ====================================
// custom option button
// ====================================

{
  <Filter>
      <FilterTitle>Color</FilterTitle>
          {product.color?.map((c) => (
              <FilterColor color={c} key={c} onClick={() => setColor(c)} />
          ))}
  </Filter>
}

// ====================================
// custom option button
// ====================================
{
  <Filter>
      <FilterTitle>Size</FilterTitle>
      <FilterSize onChange={(e) => setSize(e.target.value)}>
        {product.size?.map((s) => (
          <FilterSizeOption key={s}>{s}</FilterSizeOption>
        ))}
      </FilterSize>
  </Filter>
}
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;


const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

