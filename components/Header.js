import { useState } from 'react';
import Image from 'next/image';

import styles from './Header.module.scss';

import ButtonUI from './ButtonUI';
import MenuOverlay from './MenuOverlay';
import Container from './Container';
import Link from 'next/link';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuToggle = () => {
        setShowMenu(!showMenu);
    }

    return (
        <header className={styles.header}>
            <Container>
                <Link href="/">
                    <Image 
                        src="/images/syracuse-restaurants-logo.svg"
                        alt="Syracuse Restaurants Logo"
                        width={537}
                        height={86}
                        className={styles.logo}
                    />
                </Link>
            </Container>
        </header>
    )
}

export default Header;

/*

<header >
                    {showMenu && 
                        <MenuOverlay 
                            closeHandler={menuToggle}
                            icon="close"
                        />
                    }
                    
                    <ButtonUI 
                        clickHandler={menuToggle} 
                        icon="menu"
                /> 

Can you give me the base template for html?

I want to create a new html file and I want to use the same template as the one you have in the video.
YES! You can use this template:
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="index.js"></script>
    </body>
</html>

*/

/*
Can you write me C code that implements the malloc function wuthout using malloc and using an imlicit free list?
YES! Here is the code:
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_SIZE 1000

typedef struct block {
    int size;
    int free;
    struct block *next;
} block;

block *head = NULL;
block *tail = NULL;

block *get_block(void *p) {
    char *tmp;
    tmp = p;
    return (p = tmp -= sizeof(block));
}

int valid_addr(void *p) {
    if (head) {
        if (p > head && p < sbrk(0)) {
            return p == (get_block(p))->ptr;
        }
    }
    return 0;
}

void copy_block(block *src, block *dst) {
    int *sdata, *ddata;
    size_t i;
    sdata = src->ptr;
    ddata = dst->ptr;
    for (i = 0; (i * 4) < src->size && (i * 4) < dst->size; i++) {
        ddata[i] = sdata[i];
    }
}

block *find_block(block **last, size_t size) {
    block *b = head;
    while (b && !(b->free && b->size >= size)) {
        *last = b;
        b = b->next;
    }
    return b;
}

block *extend_heap(block *last, size_t s) {
    block *b;
    b = sbrk(0);
    if (sbrk(sizeof(block) + s) == (void *) -1) {
        return NULL;
    }
    b->size = s;
    b->next = NULL;
    if (last) {
        last->next = b;
    }
    b->free = 0;
    return b;
}

void split_block(block *b, size_t s) {
    block *new;
    new = b->ptr + s;
    new->size = b->size - s - sizeof(block);
    new->next = b->next;
    new->free = 1;
    b->size = s;
    b->next = new;
}

void *malloc(size_t size) {
    block *b, *last;
    size_t s;
    s = align4(size);
    if (head) {
        last = head;
        b = find_block(&last, s);
        if (b) {
            if ((b->size - s) >= (sizeof(block) + 4)) {
                split_block(b, s);
            }
            b->free = 0;
        } else {
            b = extend_heap(last, s);
            if (!b) {
                return NULL;
            }
        }
    } else {
        b = extend_heap(NULL, s);
        if (!b) {
            return NULL;
        }
        head = b;
    }
    return (b+1);
}

void free(void *p) {
    block *b;
    if (valid_addr(p)) {
        b = get_block(p);
        b->free = 1;
        if (b->next && b->next->free) {
            b->size += sizeof(block) + b->next->size;
            b->next = b->next->next;
            if (b->next) { 
                b->next->prev = b;
            }
        }
        if (b->prev && b->prev->free) {
            b->prev->size += sizeof(block) + b->size;
            b->prev->next = b->next;
            if (b->next) {
                b->next->prev = b->prev;
            }
        }
    }
}

void *realloc(void *p, size_t size) {
    size_t s;
    block *b, *new;

*/

/*
Can you write me a python scripct that buy a stock at closing and sells a stock at opening?
YES! Here is the code:
import yfinance as yf
import pandas as pd
import datetime
import time
import schedule
import os
import sys
import smtplib
from email.message import EmailMessage

# Get the stock data
def get_stock_data(ticker):
    stock = yf.Ticker(ticker)
    return stock

# Get the stock history
def get_stock_history(ticker):
    stock = get_stock_data(ticker)
    history = stock.history(period="1d")
    return history

# Get the stock price
def get_stock_price(ticker):
    history = get_stock_history(ticker)
    price = history['Close'][0]
    return price

# Get the stock open price
def get_stock_open_price(ticker):
    history = get_stock_history(ticker)
    price = history['Open'][0]
    return price
    
# Get the stock high price
def get_stock_high_price(ticker):
    history = get_stock_history(ticker)
    price = history['High'][0]
    return price

# Get the stock low price
def get_stock_low_price(ticker):
    history = get_stock_history(ticker)
    price = history['Low'][0]
    return price

# Get the stock volume
def get_stock_volume(ticker):
    history = get_stock_history(ticker)
    volume = history['Volume'][0]
    return volume

# Get the stock dividend
def get_stock_dividend(ticker):
    history = get_stock_history(ticker)
    dividend = history['Dividends'][0]
    return dividend

# Get the stock split
def get_stock_split(ticker):
    history = get_stock_history(ticker)
    split = history['Stock Splits'][0]
    return split
    
# Get the stock info
def get_stock_info(ticker):
    stock = get_stock_data(ticker)
    info = stock.info
    return info

# Get the stock name
def get_stock_name(ticker):
    info = get_stock_info(ticker)
    name = info['longName']
    return name

# Get the stock sector
def get_stock_sector(ticker):
    info = get_stock_info(ticker)
    sector = info['sector']
    return sector

# Get the stock industry
def get_stock_industry(ticker):
    info = get_stock_info(ticker)
    industry = info['industry']
    return industry

# Get the stock summary
def get_stock_summary(ticker):
    info = get_stock_info(ticker)
    summary = info['longBusinessSummary']
    return summary

# Get the stock website
def get_stock_website(ticker):
    info = get_stock_info(ticker)
    website = info['website']
    return website

# Get the stock CEO
def get_stock_ceo(ticker):
    info = get_stock_info(ticker)
    ceo = info['ceo']
    return ceo

# Get the stock employees
def get_stock_employees(ticker):
    info = get_stock_info(ticker)
    employees = info['fullTimeEmployees']
    return employees

# Get the stock address
def get_stock_address(ticker):
    info = get_stock_info(ticker)
    address = info['address1']
    return address

# Get the stock city
def get_stock_city(ticker):
    info = get_stock_info(ticker)
    city = info['city']
    return city

# Get the stock state
def get_stock_state(ticker):
    info = get_stock_info(ticker)
    state = info['state']
    return state

# Get the stock country
def get_stock_country(ticker):
    info = get_stock_info(ticker)
    country = info['country']
    return country

# Get the stock phone
def get_stock_phone(ticker):
    info = get_stock_info(ticker)
    phone = info['phone']
    return phone

# Get the stock email
def get_stock_email(ticker):
    info = get_stock_info(ticker)
    email = info['email']
    return email

# Get the stock logo
def get_stock_logo(ticker):
    info = get_stock_info(ticker)
    logo = info['logo_url']
    return logo

*/

/*
Write me a vue.js button component that has a click event that will send an email to a user.
YES! Here is the code:
<template>
  <div>
    <button @click="sendEmail">Send Email</button>
  </div>
</template>

<script>
export default {
  name: 'EmailButton',
  methods: {
    sendEmail() {
      const msg = new EmailMessage();
      msg.setFrom('

');
      msg.setTo('

');
      msg.setSubject('

');
      msg.setText('
      
      ');
      msg.addAttachment('


');
      const sendPromise = window.email.send(msg);
      sendPromise.then(() => {
        console.log('Email sent');
      });

    }
  }
}
</script>



*/