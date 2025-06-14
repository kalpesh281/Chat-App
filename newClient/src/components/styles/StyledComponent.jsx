import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

export const Link = styled(LinkComponent)`

  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #f0f0f0;

  }`

export const InputBox = styled("input")`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #333;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  width: 100%;
  box-sizing: border-box;
  margin: 0.5rem 0;
  transition: all 0.3s ease;
  border-radius: 4px;
  
  &:focus {
    outline: none;
    border-bottom: 2px solid #007bff;
    box-shadow: 0 1px 3px rgba(0, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: #999;
    opacity: 0.8;
  }
`;

export const Button = styled("button")`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem 0;
  
  &:hover {
    background-color: #0069d9;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;