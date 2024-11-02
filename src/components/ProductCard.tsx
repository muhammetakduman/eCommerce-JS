import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ProductType } from '../types/Types'
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';



interface ProductCardProps {
    product: ProductType
}
function ProductCard(props: ProductCardProps) {
    const { id, title, price, description, category, image, rating } = props.product;
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <div>
            <Card sx={{ cursor: 'pointer', boxShadow: '2px 3px 4px black', width: isMobile ? 215 : 330, height: isMobile ? 300 : 600, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '30px 10px' }}>
                <img src={image} width={isMobile ? 80 : 250} height={isMobile ? 100 : 230} />
                <CardContent sx={{ height: '200px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {isMobile ? <h6>{title.substring(0, 5)}</h6> : title.substring(0, 60)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {isMobile ? <h6>{description.substring(0, 30)}</h6> : description.substring(0, 200)}...
                    </Typography>
                </CardContent>
                <div>
                    <h2 style={{ fontFamily: 'arial' }}>{price}₺</h2>
                </div>
                <CardActions>
                    <Button onClick={() => navigate("/product-detail/" + id)} size="small" variant='outlined' color='info'>Detay</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default ProductCard
