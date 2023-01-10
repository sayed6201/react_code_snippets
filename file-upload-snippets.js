
const [file, setFile] = useState(null);

<div className="addProductItem">
    <label>Image</label>
    <input
    type="file"
    id="file"
    onChange={(e) => setFile(e.target.files[0])}
    />
</div>


