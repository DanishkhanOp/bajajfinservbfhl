const express = require('express');
const app = express();
app.use(express.json());

const FULL_NAME = "danish_khan";  
const DOB = "11022005";        
const EMAIL = "danish1136.be22@chitkarauniversity.edu.in";  
const ROLL_NO = "2211981136";     

function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function cr(str) {
    const r = str.split("").reverse().join("");
    return r
        .split("").map((c, id) => (id % 2 === 0 ? c.toUpperCase() : c.toLowerCase())).join("");
}

app.get('/', (req, res) => {
    res.send('API is running');
});
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];
        let o = [];
        let e = [];
        let a = [];
        let s = [];
        let sum = 0;
        let alphconcat = "";

        data.forEach(item => {
            if (isNumber(item)) {
                const num = parseInt(item);
                if (num % 2 === 0) e.push(item);
                else o.push(item);
                sum += num;
            } else if (/^[a-zA-Z]+$/.test(item)) {
                a.push(item.toUpperCase());
                alphconcat += item;
            } else {
                s.push(item);
            }
        });

        const response = {
            is_success: true,
            user_id: `${FULL_NAME}_${DOB}`,
            email: EMAIL,
            roll_number: ROLL_NO,
            odd_numbers: o,
            even_numbers: e,
            alphabets: a,
            special_characters: s,
            sum: sum.toString(),
            concat_string: cr(alphconcat)
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ is_success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
