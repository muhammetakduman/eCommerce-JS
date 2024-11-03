import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductType } from '../types/Types';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

interface ProductCardProps {
    product: ProductType;
}

function ProductCard(props: ProductCardProps) {
    const { id, title, price, description, image } = props.product;
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Card
            sx={{
                cursor: 'pointer',
                boxShadow: '2px 3px 4px black',
                width: isMobile ? 215 : 330,
                height: 'auto', // Kartın yüksekliğini otomatik ayarla
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px', // İç boşluk ekle
                margin: '30px 10px',
            }}
        >
            <img src={image} width={isMobile ? 80 : 250} height={isMobile ? 100 : 230} alt={title} />

            <CardContent sx={{ textAlign: 'center', padding: isMobile ? '8px' : '16px' }}>
                <Typography gutterBottom variant={isMobile ? "subtitle2" : "h5"} component="div">
                    {isMobile ? title.substring(0, 10) + "..." : title.substring(0, 60)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: '8px' }}>
                    {isMobile ? description.substring(0, 30) + "..." : description.substring(0, 200) + "..."}
                </Typography>
            </CardContent>

            <div>
                <Typography variant="h6" component="div" sx={{ fontFamily: 'arial', marginBottom: '8px' }}>
                    {price}₺
                </Typography>
            </div>

            <CardActions>
                <Button onClick={() => navigate("/product-detail/" + id)} size="small" variant="outlined" color="info">
                    Detay
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;
