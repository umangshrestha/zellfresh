import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Badge from '../../Badge';
import {OderItemProps} from './OrderItem.types';

export const OrderItem = ({
    name,
    price,
    imageUrl,
    description,
    unit,
    quantity

} :OderItemProps) =>{
    const totalPrice = price * quantity;
    return(
        <Card>
            <CardHeader
                avatar={
                <Avatar
                    alt={name}
                    src={imageUrl}
                    variant="square"
                    sx={{ width: 80, height: 80 }}
                />
                }
                title={<Typography variant="h6">{name}</Typography>}
        subheader={
          <Typography variant="subtitle2" color="textSecondary">
            {description}
            <br />
            Rs. {price} / {unit}
          </Typography>
        }
        action={
          <Typography sx={{ mt: 1 }} variant="h6" color="textSecondary">
            Rs. {totalPrice}
          </Typography>
        }
                
            />
        </Card>
    )

    }