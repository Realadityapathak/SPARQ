import React, { useRef, useEffect } from 'react';
import { 
  AiOutlineMinus, 
  AiOutlinePlus, 
  AiOutlineClose, 
  AiOutlineShopping 
} from 'react-icons/ai';
import { BsTrash, BsCheckCircleFill } from 'react-icons/bs';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const FREE_SHIPPING_THRESHOLD = 1999;

const Cart = () => {
  const cartRef = useRef();
  const closeBtnRef = useRef(null);
  const { 
    totalPrice, 
    totalQuantities, 
    cartItems, 
    setShowCart, 
    toggleCartItemQuantity, 
    onRemove 
  } = useStateContext();

  // Focus management, Escape key listener, and keyboard trap
  useEffect(() => {
    const previousActiveElement = document.activeElement;

    // Shift initial focus to close button after render
    const timer = setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 60);

    const handleKeyDown = (e) => {
      // Dismiss on Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowCart(false);
        return;
      }

      // Trap Tab key inside the drawer
      if (e.key === 'Tab' && cartRef.current) {
        const focusableElements = cartRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusable = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );

        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };
  }, [setShowCart]);

  const handleCheckout = async () => {
    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error('Your bag is empty.');
        return;
      }

      const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // If Stripe keys are missing in .env.local, provide graceful demo fallback
        if (data?.error === 'STRIPE_NOT_CONFIGURED' || !stripePublishableKey) {
          toast.loading('Demo Mode: Simulating checkout flow...', { duration: 1800 });
          setTimeout(() => {
            setShowCart(false);
            window.location.href = '/success';
          }, 1800);
          return;
        }

        toast.error(data?.message || 'Unable to initiate checkout. Please try again.');
        return;
      }

      if (!stripePublishableKey) {
        toast.error('Stripe publishable key is missing in .env.local.');
        return;
      }

      const stripe = await getStripe();
      if (!stripe) {
        toast.error('Stripe failed to load. Please check your publishable key.');
        return;
      }

      toast.loading('Redirecting to Stripe checkout...');
      const result = await stripe.redirectToCheckout({ sessionId: data.id });
      if (result?.error) {
        toast.error(result.error.message || 'Checkout redirection failed.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error(err.message || 'Something went wrong during checkout.');
    }
  };

  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progressPercent = Math.min(100, Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div 
      className="cart-wrapper" 
      ref={cartRef} 
      onClick={(e) => { if (e.target === cartRef.current) setShowCart(false); }}
    >
      <div className="cart-container" role="dialog" aria-modal="true" aria-label="Shopping Bag">
        {/* Cart Header */}
        <div className="cart-header">
          <div className="cart-heading">
            <span>Bag</span>
            <span className="cart-num-items">({totalQuantities})</span>
          </div>

          <button
            type="button"
            className="cart-close-btn"
            ref={closeBtnRef}
            onClick={() => setShowCart(false)}
            aria-label="Close bag"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Complimentary Delivery Progress */}
        {cartItems.length > 0 && (
          <div className="cart-shipping-meter">
            <div className="shipping-meter-text">
              {amountNeeded > 0 ? (
                <span>Add <span className="highlight">₹{amountNeeded.toLocaleString('en-IN')}</span> for free delivery</span>
              ) : (
                <span className="highlight shipping-unlocked">
                  <BsCheckCircleFill className="shipping-check-icon" />
                  <span>Complimentary express delivery unlocked</span>
                </span>
              )}
            </div>
            <div className="shipping-meter-bar">
              <div 
                className="shipping-meter-fill" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Empty Bag State */}
        {cartItems.length === 0 && (
          <div className="empty-cart">
            <AiOutlineShopping className="empty-cart-icon" />
            <h3>Your bag is empty</h3>
            <p>Explore headphones, earbuds, and wearables.</p>
            <button
              type="button"
              onClick={() => setShowCart(false)}
              className="btn-primary"
            >
              Explore Collection
            </button>
          </div>
        )}

        {/* Cart Items List */}
        <div className="product-container">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              {item?.image?.[0] && (
                <img 
                  src={urlFor(item.image[0]).width(240).height(240).format('webp').quality(80).url()} 
                  alt={item.name} 
                  className="cart-product-image"
                  width="120"
                  height="120"
                  loading="lazy"
                />
              )}

              <div className="item-desc">
                <div className="top">
                  <h5>{item.name}</h5>
                  <h4>₹{(item.price * item.quantity).toLocaleString('en-IN')}</h4>
                </div>

                <div className="bottom">
                  <div className="item-stepper">
                    <button 
                      type="button" 
                      onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                      aria-label="Decrease quantity"
                    >
                      <AiOutlineMinus />
                    </button>
                    <span className="num">{item.quantity}</span>
                    <button 
                      type="button" 
                      onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                      aria-label="Increase quantity"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                    aria-label={`Remove ${item.name} from bag`}
                    title="Remove item"
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Console */}
        {cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="cart-subtotal-row">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-amount">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <button 
              type="button" 
              className="btn-checkout" 
              onClick={handleCheckout}
            >
              <span>Check Out</span>
              <span className="checkout-btn-dot">•</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
