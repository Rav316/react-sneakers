package ru.alex.reactsneakersapi.database.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import ru.alex.reactsneakersapi.database.entity.OrderStatus;

@Converter(autoApply = true)
public class OrderStatusConverter implements AttributeConverter<OrderStatus, String> {
    @Override
    public String convertToDatabaseColumn(OrderStatus orderStatus) {
        return (orderStatus == null) ? null : orderStatus.name().toLowerCase();
    }

    @Override
    public OrderStatus convertToEntityAttribute(String s) {
        return (s == null) ? null : OrderStatus.valueOf(s.toUpperCase());
    }
}
